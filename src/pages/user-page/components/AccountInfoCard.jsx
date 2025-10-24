import { Card, CardContent } from "@mui/material";

export default function AccountInfoCard({ user }) {
  const userRole = user?.role?.replace("_", " ");

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        {/* <section className="p-4"> */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">User ID</p>
            <p className="text-gray-800 font-medium">{user?.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Account Created</p>
            <p className="text-gray-800 font-medium">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-gray-800 font-medium">{user?.email || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Role</p>
            <p className="text-gray-800 font-medium capitalize">{userRole}</p>
          </div>
        </div>
        {/* </section> */}
      </CardContent>
    </Card>
  );
}
