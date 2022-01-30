import {User} from "../../auth/models/user.model";
import {JobLike} from "./job-like.model";
import {JobApplication} from "./job-application.model";

export interface JobOffer {
  id: number;
  title: string;
  description: string;
  // likesCount: number;
  type: string;
  category: string;
  user?: User;
  userId: number;
  jobLikes?: JobLike[];
  jobApplications?: JobApplication[];
}
