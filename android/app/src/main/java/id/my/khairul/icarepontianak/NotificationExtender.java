package id.my.khairul.icarepontianak;

import com.onesignal.NotificationExtenderService;
import com.onesignal.OSNotificationReceivedResult;

public class NotificationExtender extends NotificationExtenderService {
    @Override
    protected boolean onNotificationProcessing(OSNotificationReceivedResult receivedResult) {
        return false;
    }
}
