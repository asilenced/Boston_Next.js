import { useState } from 'react';
import { clientsData } from '../../data/clientsData';
import { clientsHeading } from '../../data/clientsData';
import AboutClientSingle from './AboutClientSingle';

function AboutClients() {
	const [clients, setClients] = useState(clientsData);
	return (
		<div className="mt-10 sm:mt-20">
			<p className="text-2xl text-center font-general-medium sm:text-3xl text-primary-dark dark:text-primary-light">
				{clientsHeading}
			</p>
			<div className="grid grid-cols-2 gap-2 mt-10 sm:grid-cols-4 sm:mt-14">
				{clients.map((client) => (
					<AboutClientSingle
						title={client.title}
						image={client.img}
						key={client.id}
					/>
				))}
			</div>
		</div>
	);
}

export default AboutClients;
