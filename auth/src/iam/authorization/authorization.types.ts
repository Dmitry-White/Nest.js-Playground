import { CoffeesPermission } from '../../coffees/coffees.permissions';

const Permission = {
  ...CoffeesPermission,
};

type PermissionType = CoffeesPermission;

type Policy = {
  name: string;
};

export { Permission, PermissionType, Policy };
