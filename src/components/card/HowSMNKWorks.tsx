import * as React from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import { useRouter } from "next/router";

export default function HowSMNKWorks() {
  const router = useRouter();
  return (
    <>
      <Card
        sx={{
          p: {
            xs: ".5rem",
            sm: "1rem 10rem",
            md: "1rem 12rem",
            lg: "1rem 20rem",
            xl: "1rem 30rem",
          },
          m: 2,
        }}
      >
        <CardHeader title={`Let's Get You Started`} />
        <CardContent>
          <Card>
            <CardContent>
              <Typography>
                Start Your journey with SMNK by creating an account. You can
                create an account as a Skilled Worker/Professional/Service
                Provider Or as a Client/Employer/Customer
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <Button
                onClick={() => {
                  router.push("/account/signup");
                }}
                sx={{
                  bgcolor: "#C7CEDB",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  borderRadius: "30px",
                  maxWidth: 350,
                }}
                fullWidth
              >
                Create an account
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Post Jobs" />
            <CardContent>
              <Typography>
                It is free and easy to post a job. You can simply choose your
                identity,profile and budget and recommendations would come
                witing minutes.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Choose A Professional" />
            <CardContent>
              <Typography>
                No discrimination on any job. We have got Professionals/Artisans
                for jobs of any budget or size, across 1000+ skills. As long as
                there is a job to be done, then there is an expert that can do
                it
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Pay Safely" />
            <CardContent>
              <Typography>
                SMNK guarantees that only professionals/Skilled workers who have
                completed their jobs satisfactorily will receive your money.
                Fell free to pay through our milestone payment system.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardHeader title="We Are Here To help" />
            <CardContent>
              <Typography>
                Our talented team of recruiters are always available to find you
                the best fit for your job and ensure you get true value for your
                money
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
}
