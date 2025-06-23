"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  (user);

  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar className="!bg-black">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         Obinna Chukwunenye
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ThemeToggle />

          {user ? (
            <>
              <Typography>Hi, {user.name}</Typography>
              <Button
                color="inherit"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
