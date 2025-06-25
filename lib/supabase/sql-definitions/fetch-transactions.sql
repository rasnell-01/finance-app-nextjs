CREATE OR REPLACE FUNCTION fetch_transactions(
    range_arg VARCHAR default 'last30days',
    limit_arg INT default 20,
    offset_arg INT default 0
)
RETURNS SETOF transactions AS $$
DECLARE
startDate TIMESTAMP;
    endDate TIMESTAMP := NOW();
BEGIN
CASE range_arg
        WHEN 'last24hours' THEN
            startDate := NOW() - INTERVAL '24 hours';
WHEN 'last7days' THEN
            startDate := NOW() - INTERVAL '7 days';
WHEN 'last30days' THEN
            startDate := NOW() - INTERVAL '30 days';
WHEN 'last90days' THEN
            startDate := NOW() - INTERVAL '90 days';
WHEN 'last180days' THEN
            startDate := NOW() - INTERVAL '180 days';
WHEN 'last365days' THEN
            startDate := NOW() - INTERVAL '365 days';
WHEN 'all' THEN
            startDate := '1770-01-01 00:00:00';
ELSE
            startDate := NOW() - INTERVAL '30 days'; -- Default case
END CASE;

RETURN QUERY SELECT * FROM transactions
    WHERE created_at BETWEEN startDate AND endDate
    ORDER BY created_at DESC
    LIMIT limit_arg OFFSET offset_arg;
END;
$$ LANGUAGE plpgsql;
