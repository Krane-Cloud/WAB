export interface NavigationTree{
    name:string;
    icon:string;
    href?:Array<string>;
    baseref?:Array<string>;
    tooltip?:string;
    disabled?:boolean;
    children?:NavigationTree[];
}