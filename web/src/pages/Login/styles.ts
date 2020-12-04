import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  background-color: #121214;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  header {

    margin-bottom: 36px;

    h1 {
      color: #E1E1E6;
      font-size: 60px;
      font-weight: bold;
    }
  }

  form {
    input {
      width: 100%;
      padding: 16px 24px;
      background-color: #121214;

      font-size: 16px;
      color: #FFFFFF;

      border: 2px solid #121214;

      border-radius: 8px;
      outline: none;
      margin-bottom: 12px;
    }

    input:focus {
      border: 2px solid #0267C1;
    }

    button {
      display: block;
      background-color: #0267C1;
      color: #FFFFFF;
      width: 100%;
      padding: 20px;

      border: none;
      outline: none;
      border-radius: 8px;
      cursor: pointer;
    }
  }
`;

export const Content = styled.div`
  background-color: rgb(32, 32, 36);

  padding: 64px;
  border-radius: 8px;
`;
