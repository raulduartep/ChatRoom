import styled, { css } from 'styled-components';

interface MessageProps {
  readonly owner?: boolean;
}

export const Container = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;

  background-color: #121214;

  grid-template-areas:
    "userslist messageslist"
    "userslist userinput";

  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr 50px;
`;

export const UsersContainer = styled.div`
  grid-area: userslist;
  background-color: rgb(32, 32, 36);

  width: 100%;

  padding: 16px;

  header {
    margin-bottom: 16px;
      
    h2 {
      font-weight: bold;
    }
  }

`;

export const UsersList = styled.ul`

  padding: 0 12px;

  li {
    list-style: none;
  }

  li + li {
    margin-top: 8px;
  }
`;

export const MessagesList = styled.ul`
  grid-area: messageslist;

  padding: 16px;
  
`;

export const MessageContent = styled.div`

  padding: 8px;
  border-radius: 4px;
  max-width: 70%;

  header {

    margin-bottom: 8px;

    p {
      font-size: 10px;
      color: #505152;
    }
  }

  main {

    margin-left: 4px;

    p {
      border-radius: 4px;
      font-size: 12px;
      word-wrap: break-word;
      word-break: break-word;
    }
  }
`;

export const MessageContainer = styled.li<MessageProps>`
  list-style: none;
  display: flex;
  width: 100%;
  margin-bottom: 12px;

  ${({ owner }) => owner 
  ? css`

    justify-content: flex-end;

    ${MessageContent} {
      background-color: #0267C1;
    }
  `
  : css`   
    justify-content: flex-start;

    ${MessageContent} {
      background-color: rgb(32, 32, 36);
    }
  `
  }
`;

export const UserInputForm = styled.form`
  grid-area: userinput;
  display: flex;
  width: 100%;
  align-items: flex-end;
  padding: 12px;

  button {

    border: none;
    outline: none;
    border-radius: 12px;
    padding: 12px;
    margin-left: 12px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 12px;
    font-weight: normal;

    background-color: rgb(32, 32, 36);
    color: #FFFFFF;
    cursor: pointer;
  }

  textarea {
    height: 24px;
    resize: none;
    outline: none;
    border: none;
    border-radius: 12px;
    flex-grow: 1;

    background-color: rgb(32, 32, 36);
    color: #FFFFFF;
    
    font-size: 12px;
    font-weight: normal;
    padding: 4px 12px;
  }
`;