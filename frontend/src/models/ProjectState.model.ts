interface ProjectStateModel {
  title:            string;
  description:      string;
  gallery_media:    any[];
  project_category: { type: string, color: string };
  header_color?:    string;
}

export default ProjectStateModel;
