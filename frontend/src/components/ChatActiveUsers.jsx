import floppaHead from "../imgs/floppa-head.png";
import styled from "styled-components";

const ActiveUsersContainer = styled.div`
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.5rem;

    & img {
        height: 2rem;
    }
`;

const ChatActiveUsers = ({ count }) => (
    <ActiveUsersContainer>
        <img src={floppaHead} alt="Floppahead" />
        <div>{count}</div>
    </ActiveUsersContainer>
);
export default ChatActiveUsers;
