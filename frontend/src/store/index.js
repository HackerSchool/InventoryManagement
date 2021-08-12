import locations from './locations';
import materials from './materials';
import members from './members';
import meta from './meta';
import projects from './projects';
import requisitions from './requisitions';
import user from './user';

export default {
  ...meta,
  modules: {
    locations,
    materials,
    members,
    user,
    projects,
    requisitions,
  },
};
