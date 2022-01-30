import {User} from "../../auth/models/user.model";
import {JobOffer} from "./offer.model";

export interface JobApplication {
  id: number;
  userId: number;
  user: User;
  jobOfferId: number;
  jobOffer: JobOffer;
  status: string;
}
