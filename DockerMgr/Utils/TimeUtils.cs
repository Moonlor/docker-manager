using System;

namespace DockerMgr.Utils
{
    public class TimeUtils
    {
        public static long getTimeStamp()
        {
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1)); // 当地时区
            long timeStamp = (long)(DateTime.Now - startTime).TotalMilliseconds; // 相差毫秒数

            return timeStamp;
        }
    }
}