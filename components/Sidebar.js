import styled from "styled-components";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../components/Chat.js";
import { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export default function Sidebar() {
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );
    if (!input) return null;

    //Email validator & check for chat availability
    if (
      EmailValidator.validate(input) &&
      input !== user.email &&
      !chatAlreadyExists(input)
    ) {
      // add chat into db chat collection
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const [open, setOpen] = useState(false);

  //click-away listener
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  const chatAlreadyExists = (recipientEmail) =>
    // adding the chat to the db chats collection if it doesn't exist and is valid
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserDetails>
          <UserAvatar src={user.photoURL} />
          <UserName>{user.displayName}</UserName>
        </UserDetails>

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>

          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              {open ? (
                <Dropdown onClick={() => auth.signOut()}>
                  <li>Profile</li>
                  <li>Contact Info</li>
                  <li>Settings</li>
                  <li>Logout</li>
                </Dropdown>
              ) : null}
            </div>
          </ClickAwayListener>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List Of chats */}
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 500px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: -webkit-fill-available;
  width: -moz-available;
  &&& {
    margin: 10px 20px;
    background-color: whitesmoke;
    padding: 10px 0;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserName = styled.h5`
  margin-left: 10px;
`;
const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const IconsContainer = styled.div`
  display: flex;
`;
const Dropdown = styled.div`
  background-color: white;
  color: grey;
  position: absolute;
  z-index: 1;
  border-radius: 3px;
  border: 1px solid grey;
  padding: 10px;
  right: 30px;
  > li {
    list-style: none;
    padding: 8px;
    :hover {
      color: black;
      background-color: whitesmoke;
    }
  }
  :hover {
    cursor: pointer;
  }
`;
