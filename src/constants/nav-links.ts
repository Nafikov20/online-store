import {ROUTES} from "@/constants/routes-links";


interface NavLink {
  name: string;
  path: string;
}
export const NAV_LINKS: NavLink[] = [
  { name: 'Магазин', path: ROUTES.store },
  { name: 'Доставка', path: ROUTES.delivery },
  { name: 'О нас', path: ROUTES.about },
];
