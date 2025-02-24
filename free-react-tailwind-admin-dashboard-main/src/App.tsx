import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/Purchases";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import NewPurchase from "./pages/Forms/NewPurchase"; // Assuming this is the correct import path
import NewDesignCode from "./pages/Forms/NewDesignCode"; // Assuming this is the correct import path
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';
import 'react-circular-progressbar/dist/styles.css';
import Purchases from "./pages/Tables/Purchases";
import DesignCodes from "./pages/Tables/DesignCodes";
import Returns from "./pages/Tables/Returns";
import Completed from "./pages/Tables/Reports/Completed";
import OutDated from "./pages/Tables/Reports/OutDated";
import Pending from "./pages/Tables/Reports/Pending";
import InProgress from "./pages/Tables/Reports/InProgress";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />

              {/* Forms */}
              {/* <Route path="/form-elements" element={<FormElements />} /> */}

              {/* Tables */}
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/design-codes" element={<DesignCodes />} />
              <Route path="/returns" element={<Returns />} />

              {/* Tables --> Reports */}
              <Route path="/out-dated" element={<OutDated />} />
              <Route path="/completed" element={<Completed />} />
              <Route path="/inprogress" element={<InProgress />} />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />

              {/* New Routes */}
              <Route path="/new-purchase" element={<NewPurchase />} />
              <Route path="/new-design-code" element={<NewDesignCode />} />
            </Route>

            {/* Auth Layout */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
