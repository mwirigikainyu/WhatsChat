import Head from "next/head";
import Image from "next/image";
import logo from "../public/assets/logo.png";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { auth, provider } from "../firebase";

export default function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>WhatsChat</title>
      </Head>

      <LoginContainer>
        <Logo>
          <Image
            src={logo}
            alt="logo"
            layout="responsive"
            width="200px"
            height="200px"
          />
        </Logo>
        <Button
          onClick={signIn}
          variant="contained"
          size="large"
          startIcon={<VpnKeyIcon />}
        >
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 100px 150px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Logo = styled.div`
  padding: 30px;
`;
