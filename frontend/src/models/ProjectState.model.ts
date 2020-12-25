import ProjectGalleriaPropsModel from './ProjectGalleriaProps.model';

interface ProjectStateModel {
  title:            string;
  description:      string;
  main_img?:        any;
  alt_img?:         any;
  galleria_media?:  ProjectGalleriaPropsModel[];
  project_category: { type: string, color: string };
  header_color?:    string;
}

export default ProjectStateModel;
