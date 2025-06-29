import SettingsFormName from "@/app/dashboard/settings/components/settings-form-name";
import SettingsFormPreferences from "@/app/dashboard/settings/components/settings-form-preferences";
import SettingsFormDateTime from "@/app/dashboard/settings/components/settings-form-date-time";
import SettingsFormDefaultView from "@/app/dashboard/settings/components/settings-form-default-view";
import SettingsFormPassword from "@/app/dashboard/settings/components/settings-form-password";
import SettingsFormEmail from "@/app/dashboard/settings/components/settings-form-email";

export default function SettingsForm({defaults}) {
    return (
        <div className="space-y-8">
            <SettingsFormName defaults={defaults} />
            <hr className="my-8" />
            <SettingsFormEmail defaults={defaults} />
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
