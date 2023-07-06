import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AccountActions from "../home/navbar/actions";
import NavbarDrawer from "../home/navbar/navBarDrawer";
import SearchDrawer from "../drawer/SearchDrawer";
import DPAvatar from "../avatar/DPAvatar";
import { Grid, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import { theme } from "@/pages/_app";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Container, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function HomeLogoutAppBar() {
  const { user } = useSelector((state: RootState) => state.users);
  const router = useRouter();
  const [openAbout, setOpenAbout] = React.useState(false);
  return (
    <Toolbar sx={{ pt: 2, display: "flex", flexDirection: "column" }}>
      <Grid container>
        <Grid
          item
          xs={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <NavbarDrawer />
        </Grid>
        <Grid
          item
          xs={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image
            alt="SMNK Nig Ltd"
            src="/assets/smnk.png"
            width={50}
            height={50}
            style={{ borderRadius: "50%", marginRight: ".5rem" }}
            onClick={() => {
              router.push("/");
            }}
          />
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <SearchDrawer footer={false} />
        </Grid>

        <Grid
          item
          xs={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {user && user._id && (
            <IconButton
              onClick={() => {
                if (user.type === "skilled worker") {
                  router.push("/sw-dashboard");
                } else {
                  router.push("/c-dashboard");
                }
              }}
            >
              <DPAvatar dp={user.dpFileName} />
            </IconButton>
          )}
          {!user._id && <AccountActions />}
        </Grid>
      </Grid>
      <Box
        sx={{
          maxWidth: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              setOpenAbout(!openAbout);
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">About Us</Typography>}
            />
            {openAbout ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openAbout} timeout="auto" unmountOnExit>
            <Box
              display={openAbout ? "block" : "none"}
              bgcolor="whitesmoke"
              minWidth={150}
              position={"absolute"}
              left={15}
              top={50}
              zIndex={99}
            >
              <ListItemButton
                onClick={(event) => {
                  router.push("/about-us");
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">About SMNK</Typography>}
                />
              </ListItemButton>
              <ListItemButton
                onClick={(event) => {
                  router.push("/vision");
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">Vision</Typography>}
                />
              </ListItemButton>
              <ListItemButton
                onClick={(event) => {
                  router.push("/mission");
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">Mission</Typography>}
                />
              </ListItemButton>
              <ListItemButton
                onClick={(event) => {
                  router.push("/purpose");
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">Purpose</Typography>}
                />
              </ListItemButton>
              <ListItemButton
                onClick={(event) => {
                  router.push("/team");
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">Our Team</Typography>}
                />
              </ListItemButton>
            </Box>
          </Collapse>
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              router.push("/services");
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">Services</Typography>}
            />
          </ListItemButton>
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              router.push("/jobs");
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">Jobs</Typography>}
            />
          </ListItemButton>

          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              router.push("/jobs");
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">Blog</Typography>}
            />
          </ListItemButton>
        </List>
      </Box>
    </Toolbar>
  );
}
export function AppBarLogo() {
  const router = useRouter();
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography
        fontFamily={`'Bungee Shade', cursive`}
        fontWeight={"bold"}
        fontSize={"2rem"}
        onClick={() => {
          router.push("/");
        }}
        sx={{ color: theme.smnk[1000] }}
      >
        SMNK
      </Typography>
      <Typography fontFamily={`'Bungee Spice', cursive`} fontSize={".4rem"}>
        we connect,you collect
      </Typography>
    </Box>
  );
}
