import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";

import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="booking" element={<Bookings />}></Route>
            <Route path="cabins" element={<Cabins />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="settings" element={<Settings />}></Route>
            <Route path="account" element={<Account />}></Route>
          </Route>
          <Route index element={<Navigate replace to="dashboard" />} />

          <Route path="login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// import GlobalStyles from "./styles/GlobalStyles";
// import { Button } from "./ui/Button";
// import Input from "./ui/Input";
// import Heading from "./ui/Heading";
// import styled from "styled-components";
// import Row from "./ui/Row";

// const StyledApp = styled.main`
//   background-color: orangered;
//   padding: 20px;
// `;
// function App() {
//   return (
//     <>
//       <GlobalStyles />
//       <StyledApp>
//         <Row>
//           <Row type="horizontal">
//             <Heading as="h1">The Wild Oasis</Heading>
//             <div>
//               <Heading as="h2">Check in and out</Heading>
//               <Button variation="primary" size="medium">Check In</Button>
//               <Button variation="secondary" size="small">Check Out</Button>
//             </div>
//           </Row>

//           <Row type="vertical">
//           <Heading as="h3">Form</Heading>
//             <form>
//               <Input type="number" placeholder="Number of gursts"/>
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   );
// }

// export default App;
