import { addCampaignSuccess } from "../redux/campaigns";
import { store } from "../redux/store";

export default function AddCampaigns(campaignData) {
  store.dispatch(addCampaignSuccess(campaignData));
}
