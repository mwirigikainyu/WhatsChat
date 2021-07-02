import Loader from "react-loader-spinner";
import styled from "styled-components";

export default function Loading() {
    return (
        <Container>
            <h1 style={{ color: "#3CBC28" }}>WhatsApp 2.0</h1>
            <Loader
                type="ThreeDots"
                color="#3CBC28"
                height={60}
                width={60}
            />
        </Container>
    );
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 100vh;
`;