interface ProjectCardsPropsModel {
  title:                    string;
  main_img?:                any;
  project_category: {
    type:   string;
    color:  string;
  };
  project_id:               string;
}

export default ProjectCardsPropsModel;
