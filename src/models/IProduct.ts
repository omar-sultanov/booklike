export interface IProduct {
  kind: string;
  id: string;
  liked: boolean;
  volumeInfo: {
    title: string;
    categories: [string];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
}
