import { Card, CardContent, Divider } from "@mui/material";
import useAuthStore from "@stores/useAuthStore";

// Components
import AccountProfileHeader from "./components/AccountProfileHeader";
import ChangePasswordCard from "./components/ChangePasswordCard";
import DeleteAccountCard from "./components/DeleteAccountCard";
import AccountInfoCard from "./components/AccountInfoCard";
import { useEffect } from "react";

export default function AccountPage() {
  const { user, refreshUser } = useAuthStore();

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-4 md:p-6 lg:p-8">
      <div className="min-h-screen max-w-7xl 2xl:max-w-[1600px] mx-auto ">
        <div className="mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Account Settings
            </h1>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Header Card */}
          <Card className="shadow-lg mb-6">
            <CardContent className="p-6">
              <AccountProfileHeader user={user} />
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div className="space-y-6">
              <ChangePasswordCard
                changePasswordStatus={user?.change_password}
                userId={user?.id}
              />

              {/* Account Info Card */}
              <AccountInfoCard user={user} />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 mt-8">
            <p>
              {new Date().toLocaleString()} • User ID: {user?.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
