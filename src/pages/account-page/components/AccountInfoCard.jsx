import { Card, CardContent } from "@mui/material";
import { Info, Calendar, Shield, User as UserIcon } from "lucide-react";

export default function AccountInfoCard({ user }) {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="text-red-800" size={24} />
          <h2 className="text-xl font-bold text-gray-800">
            Account Information
          </h2>
        </div>

        <div className="space-y-4">
          {/* User ID */}
          <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
            <div className="flex items-start gap-3">
              <UserIcon
                className="text-gray-600 mt-1 flex-shrink-0"
                size={20}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  User ID
                </h3>
                <p className="text-gray-700 font-mono text-sm">{user?.id}</p>
              </div>
            </div>
          </div>

          {/* Account Created */}
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-start gap-3">
              <Calendar
                className="text-blue-600 mt-1 flex-shrink-0"
                size={20}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  Account Created
                </h3>
                <p className="text-gray-700 text-sm">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Security Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Use a strong, unique password</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Don't share your account credentials</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
