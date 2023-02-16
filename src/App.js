import "./App.css";
import CampaignList from "./pages/campaign-list";
import AddCampaigns from "./service/addCampaign";

window.AddCampaigns = AddCampaigns;

function App() {
  return <CampaignList />;
}

export default App;
