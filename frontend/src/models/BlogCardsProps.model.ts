interface BlogCardsPropsModel {
  title:            string;
  description:      string;
  main_img?:         any;
  blog_category: {
    type:     string;
    color:    string;
  }
  blog_id:          string;
  date:             Date;
}

export default BlogCardsPropsModel
