import styles from './schedule.module.css'
import Link from 'next/link'

export default function ScheduleCard({ type, date, status, imageUrl, title, learnMore, venue }) {
	return (
		<div className={styles['wrapper']}>
			<div className={styles['event-type-wrapper']}>
				{type && <div className={styles['event-type']}>{type}</div>}
				<div className={styles['seperation']}></div>
				<div className={styles['date-status-wrapper']}>
					<div className={styles['event-date-time']}>{date}</div>
					<div className={styles[`status-${status}`]}>{status}</div>
				</div>
			</div>
			<div className={styles['event-wrapper']}>
				<div className={styles['event-image']}>
					<img src={imageUrl} />
				</div>
				<div className={styles['event-name-wrapper']}>
					<h3 className={styles['event-name']}>{title}</h3>
					<div className={styles['learn-more-wrapper']}>
						<Link href={learnMore}>
							<button className={styles['learn-more-button']}>learn more</button>
						</Link>
						{venue && (
							<div className={styles['venue']}>
								<img src='/svgs/schedule-location.svg' className={styles['location']} />
								<div className={styles['mobile-event-type']}>{venue}</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
