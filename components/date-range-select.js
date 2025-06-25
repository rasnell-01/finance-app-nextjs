import Select from "@/components/select";

export default function DateRangeSelect(props) {
    return <Select {...props}>
        <option value="last24hours">Last 24 hours</option>
        <option value="last7days">Last 7 days</option>
        <option value="last30days">Last 30 days</option>
        <option value="last90days">Last 90 days</option>
        <option value="last180days">Last 180 days</option>
        <option value="last365days">Last 365 days</option>
        <option value="all_time">All</option>
    </Select>
}
