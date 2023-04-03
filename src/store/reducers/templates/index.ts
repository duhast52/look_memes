import { TemplatesAction, TemplatesActionEnum, TemplatesState } from "./types";
import Meme1Img from "src/assets/images/meme_image1.png";
import Meme2Img from "src/assets/images/meme_image2.png";
import Meme3Img from "src/assets/images/meme_image3.png";
import { v4 as uuid } from "uuid";

const initialState: TemplatesState = {
  isLoading: false,
  templatesArray: [
    {
      TemplateImg: Meme1Img,
      status: "Moderation",
      category: "Popular",
      name: "Hugging",
      slug: "hugging",
      tags: ["hugging", "DSADSdsa", "sadasdsa", "dasasdads", "dsaadsdsa"],
      metadata: "HI",
      isShow: true,
      id: uuid(),
    },
    {
      TemplateImg: Meme2Img,
      status: "Not approved",
      category: "New",
      name: "Doge",
      slug: "doge",
      tags: ["doge"],
      metadata: "HI",
      isShow: true,
      comment: "WHY?",
      id: uuid(),
    },
    {
      TemplateImg: Meme3Img,
      status: "Approved",
      category: "Other",
      name: "Surprised Pikachu",
      slug: "surprised_pikachu",
      tags: ["pikachu"],
      metadata: "HI",
      isShow: true,
      id: uuid(),
    },
    {
      TemplateImg: Meme1Img,
      status: "Moderation",
      category: "Popular",
      name: "Hugging",
      slug: "hugging2",
      tags: ["HI"],
      metadata: "HI",
      isShow: true,
      id: uuid(),
    },
    {
      TemplateImg: Meme2Img,
      status: "Not approved",
      category: "New",
      name: "Doge",
      slug: "doge2",
      tags: ["doge2"],
      metadata: "HI",
      isShow: true,
      comment: "WHY?",
      id: uuid(),
    },
    {
      TemplateImg: Meme3Img,
      status: "Approved",
      category: "Other",
      name: "Surprised Pikachu",
      slug: "surprised_pikach2",
      tags: ["pikach2"],
      metadata: "HI",
      isShow: true,
      id: uuid(),
    },
    {
      TemplateImg: Meme1Img,
      status: "Moderation",
      category: "Popular",
      name: "Hugging",
      slug: "hugging3",
      tags: ["hello"],
      metadata: "HI",
      isShow: true,
      id: uuid(),
    },
    {
      TemplateImg: Meme2Img,
      status: "Not approved",
      category: "Popular",
      name: "Doge",
      slug: "doge3",
      tags: ["doge3"],
      metadata: "HI",
      isShow: true,
      comment: "WHY?",
      id: uuid(),
    },
    {
      TemplateImg: Meme3Img,
      status: "Approved",
      category: "Other",
      name: "Hugging",
      slug: "hugging4",
      tags: ["other"],
      metadata: "HI",
      isShow: true,
      id: uuid(),
    },
    {
      TemplateImg: Meme1Img,
      status: "Moderation",
      category: "Other",
      name: "Hugging",
      slug: "hugging5",
      tags: ["moderation"],
      metadata: "HI",
      isShow: true,
      id: uuid(),
    },
    {
      TemplateImg: Meme2Img,
      status: "Not approved",
      category: "Popular",
      name: "Doge",
      slug: "doge4",
      tags: ["doge4"],
      metadata: "HI",
      isShow: true,
      comment: "WHY?",
      id: uuid(),
    },
    {
      TemplateImg: Meme3Img,
      status: "Approved",
      category: "New",
      name: "Surprised Pikachu",
      slug: "surprised_pikach3",
      tags: ["new"],
      metadata: "HI",
      isShow: true,
      id: uuid(),
    },
  ],
};

export default function templatesReducer(state = initialState, action: TemplatesAction): TemplatesState {
  switch (action.type) {
    case TemplatesActionEnum.SET_TEMPLATES_ARRAY:
      return { ...state, templatesArray: action.payload, isLoading: false };
    case TemplatesActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
