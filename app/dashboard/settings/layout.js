import SideNavigation from "./components/side-navigation";

export default function Layout({children}) {
    return <div className="grid grid-cols-4 gap-8">
        <aside className="col-span-4 lg:col-span-1">
            <SideNavigation/>
        </aside>
        <div className="col-span-4 lg:col-span-3">
            {children}
        </div>
    </div>
}
