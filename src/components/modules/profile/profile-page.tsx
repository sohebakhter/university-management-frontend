"use client";

import { useRef, useState } from "react";
import { useGetMe, useUpdateUser } from "@/hooks";
import { UserRole } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Camera,
  Mail,
  Shield,
  CalendarDays,
  CheckCircle2,
  Loader2,
  User as UserIcon,
  Upload,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const { data: meData, isLoading } = useGetMe();
  const user = meData?.data;

  const { mutate: updateUser, isPending } = useUpdateUser(user?.id || "");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nameValue, setNameValue] = useState<string | null>(null);

  // Derive effective name (edited or original)
  const displayName = nameValue ?? user?.name ?? "";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleClearPreview = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    if (!user) return;

    const formData = new FormData();

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (nameValue !== null && nameValue !== user.name) {
      formData.append("name", nameValue);
    }

    // Only submit if there's something to update
    if (!selectedFile && (nameValue === null || nameValue === user.name)) {
      toast.info("No changes to save");
      return;
    }

    updateUser(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        setSelectedFile(null);
        setPreviewUrl(null);
        setNameValue(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update profile");
      },
    });
  };

  const hasChanges =
    selectedFile !== null ||
    (nameValue !== null && nameValue !== user?.name);

  const roleBadgeVariant: Record<UserRole, string> = {
    ADMIN: "bg-violet-500/10 text-violet-600 border-violet-500/30",
    INSTRUCTOR: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    STUDENT: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30",
  };

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-80 items-center justify-center text-muted-foreground">
        Unable to load profile data.
      </div>
    );
  }

  const currentImageUrl = previewUrl || user.imageUrl;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          My Profile
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal information and profile picture.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Profile Picture Card */}
        <Card className="lg:col-span-4 border-border/60 shadow-xs">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-base font-semibold">
              Profile Picture
            </CardTitle>
            <CardDescription className="text-xs">
              Click the camera icon to upload a new photo
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {/* Avatar with camera overlay */}
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg" size="lg">
                {currentImageUrl ? (
                  <AvatarImage src={currentImageUrl} alt={user.name} />
                ) : null}
                <AvatarFallback className="text-2xl font-bold bg-linear-to-br from-indigo-500 to-violet-500 text-white">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              {/* Camera overlay button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="h-8 w-8 text-white" />
              </button>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Preview indicator */}
            {previewUrl && (
              <div className="flex items-center gap-2 text-xs text-emerald-600">
                <Upload className="h-3.5 w-3.5" />
                <span>New photo selected</span>
                <button
                  type="button"
                  onClick={handleClearPreview}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Name + Role display */}
            <div className="text-center space-y-1.5">
              <h2 className="text-lg font-semibold text-foreground">
                {displayName}
              </h2>
              <Badge
                variant="outline"
                className={roleBadgeVariant[user.role as UserRole]}
              >
                <Shield className="mr-1 h-3 w-3" />
                {user.role}
              </Badge>
            </div>

            <Separator />

            {/* Quick info */}
            <div className="w-full space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <CalendarDays className="h-4 w-4 shrink-0" />
                <span>Joined {format(new Date(user.createdAt), "PPP")}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2
                  className={`h-4 w-4 shrink-0 ${
                    user.emailVerified ? "text-emerald-500" : "text-amber-500"
                  }`}
                />
                <span>{user.emailVerified ? "Account verified" : "Unverified account"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details Card */}
        <Card className="lg:col-span-8 border-border/60 shadow-xs">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">
              Personal Information
            </CardTitle>
            <CardDescription className="text-xs">
              Update your display name and profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name field */}
            <div className="space-y-2">
              <label
                htmlFor="profile-name"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                Display Name
              </label>
              <Input
                id="profile-name"
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setNameValue(e.target.value)}
                autoComplete="name"
              />
            </div>

            {/* Email (read-only) */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input value={user.email} disabled className="opacity-60" />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed.
              </p>
            </div>

            <Separator />

            {/* Account details (read-only info cards) */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                Account Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="text-sm font-medium mt-0.5">{user.role}</p>
                </div>
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        user.status === "ACTIVE" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    <p className="text-sm font-medium">{user.status}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="text-xs text-muted-foreground">Verification</p>
                  <p className="text-sm font-medium mt-0.5">
                    {user.emailVerified ? "Verified" : "Not Verified"}
                  </p>
                </div>
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm font-medium mt-0.5">
                    {format(new Date(user.createdAt), "PPP")}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Save button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={isPending || !hasChanges}
                className="gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
