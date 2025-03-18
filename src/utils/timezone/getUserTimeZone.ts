import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 사용자의 현재 타임존을 반환하는 함수
 * @returns 사용자의 현재 타임존
 */
const getUserTimeZone = () => dayjs.tz.guess();

export default getUserTimeZone;
