import {
  Box,
  CardActions,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Send } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import axios from "axios";
import { object, string } from "yup";
import moment from "moment";
import ChatHeader from "./ChatHeader";

const styles = {
  messageBlue: {
    position: "relative",
    marginLeft: "20px",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#A8DDFD",
    width: "60%",
    //height: "50px",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #97C6E3",
    borderRadius: "10px",
    "&:after": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "15px solid #A8DDFD",
      borderLeft: "15px solid transparent",
      borderRight: "15px solid transparent",
      top: "0",
      left: "-15px",
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "17px solid #97C6E3",
      borderLeft: "16px solid transparent",
      borderRight: "16px solid transparent",
      top: "-1px",
      left: "-17px",
    },
  },
  messageOrange: {
    position: "relative",
    marginRight: "20px",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#f8e896",
    width: "60%",
    //height: "50px",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #dfd087",
    borderRadius: "10px",
    "&:after": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "15px solid #f8e896",
      borderLeft: "15px solid transparent",
      borderRight: "15px solid transparent",
      top: "0",
      right: "-15px",
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "17px solid #dfd087",
      borderLeft: "16px solid transparent",
      borderRight: "16px solid transparent",
      top: "-1px",
      right: "-17px",
    },
  },
};
function SenderBox({ chat }: { chat: any }) {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
      <Box sx={styles.messageOrange}>
        <Typography>{chat.chat}</Typography>
        <Typography
          align="right"
          sx={{ fontWeight: "bold", fontSize: ".7rem" }}
        >
          {moment(chat.createdAt).format("DD/MM/YY HH:MM")}
        </Typography>
      </Box>
    </Box>
  );
}

function RecieverBox({ chat }: { chat: any }) {
  return (
    <Box>
      <Box sx={styles.messageBlue}>
        <Typography>{chat.chat}</Typography>
        <Typography
          align="right"
          sx={{ fontWeight: "bold", fontSize: ".7rem" }}
        >
          {moment(chat.createdAt).format("DD/MM/YY HH:MM")}
        </Typography>
      </Box>
    </Box>
  );
}

function SendBox({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) {
  const submitHandler = async (chat: string) => {
    try {
      await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}/api/chat`,
        data: { senderId, receiverId, chat },
      });
    } catch (err) {
      console.log(err);
    }
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    formikHelpers.resetForm();
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          const msg = await submitHandler(values.msg);
          res(msg);
        })
        .catch((err: any) => {
          console.log("Error from formik ", err);
          res(err);
        });
    });
  };
  return (
    <Box width={"90vw"}>
      <Formik
        validationSchema={object({ msg: string().required() })}
        initialValues={{ msg: "" }}
        onSubmit={formikSubmitHandler}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              borderRadius={20}
              border={"1px solid blue"}
              sx={{ backgroundColor: "whitesmoke" }}
              mt={5}
              minWidth={"98%"}
              position={"fixed"}
              bottom={"2%"}
              maxWidth={"98%"}
              left={"1%"}
              right={"1%"}
            >
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <Field
                as={TextField}
                autoFocus
                fullWidth
                name="msg"
                variant="standard"
                multiline
                placeholder="type your message"
              />

              {values.msg && (
                <>
                  <Button
                    size="small"
                    endIcon={<RestartAltIcon />}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    type="reset"
                  ></Button>
                  <Button
                    size="small"
                    endIcon={<Send />}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    type="submit"
                  ></Button>
                </>
              )}
            </Box>
            {/* <pre>{JSON.stringify(errors,null,4)}</pre> */}
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export const ChatGround = ({
  chats,
  senderId,
  receiverId,
  isAdmin,
}: {
  receiverId: string;
  senderId: string;
  chats: any[];
  isAdmin:boolean
}) => {
  return (
    <Paper sx={{ mt: "1rem" }}>
      <ChatHeader receiverId={receiverId} isChatRoom={false} isAdmin={isAdmin}/>
      <Box
        sx={{ backgroundColor: "whitesmoke" }}
        pt={3}
        pb={3}
        mt={1}
        mb={10}
        mr={1}
        ml={1}
      >
        {chats.map((chat: any, i) => (
          <Box key={i}>
            {chat.senderId === senderId ? (
              <SenderBox chat={chat} />
            ) : (
              <RecieverBox chat={chat} />
            )}
          </Box>
        ))}
        <CardActions>
          <SendBox senderId={senderId} receiverId={receiverId} />
        </CardActions>
      </Box>
    </Paper>
  );
};
