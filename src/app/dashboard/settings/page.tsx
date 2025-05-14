import DealerSettings from '@/components/settings/DealerSettings';
import NotificationDemoSection from './notification-demo-section';

export default function SettingsPage() {
  return (
    <div>
      <DealerSettings />
      <div className="px-8 pb-8">
        <NotificationDemoSection />
      </div>
    </div>
  );
}
