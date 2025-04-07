import { CoffeesPermission } from '../../coffees/coffees.permissions';

const Permission = {
  ...CoffeesPermission,
};

type PermissionType = CoffeesPermission;

export { Permission, PermissionType };
