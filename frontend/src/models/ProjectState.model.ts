interface ProjectStateModel {
  title:            string;
  description:      string;
  main_img?:        any;
  alt_img?:         any;
  galleria_media?:  any[];
  project_category: { type: string, color: string };
  header_color?:    string;
}

export default ProjectStateModel;
