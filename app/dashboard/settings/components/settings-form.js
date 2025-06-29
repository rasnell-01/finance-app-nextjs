import SettingsFormProfile from "@/app/dashboard/settings/components/settings-form-profile";
import SettingsFormPreferences from "@/app/dashboard/settings/components/settings-form-preferences";
import SettingsFormDateTime from "@/app/dashboard/settings/components/settings-form-date-time";
import SettingsFormDefaultView from "@/app/dashboard/settings/components/settings-form-default-view";
import SettingsFormPassword from "@/app/dashboard/settings/components/settings-form-password";

export default function SettingsForm({defaults}) {
    return (
        <div className="space-y-8">
            <SettingsFormProfile defaults={defaults} />
            <hr className="my-8" />
            <SettingsFormPassword defaults={defaults} />
            <hr className="my-8" />
            <SettingsFormPreferences defaults={defaults} />
            <hr className="my-8" />
            <SettingsFormDateTime defaults={defaults} />
            <hr className="my-8" />
            <SettingsFormDefaultView defaults={defaults} />
        </div>
    )
}
