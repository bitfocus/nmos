import { z } from 'zod'

export default z
	.union([
		z
			.string()
			.describe(
				'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
			),
		z
			.boolean()
			.describe(
				'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
			),
		z
			.null()
			.describe(
				'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
			),
		z
			.number()
			.describe(
				'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
			),
	])
	.describe(
		'Describes external Sender transport parameters defined in other AMWA specifications. The constraints in this schema are minimum constraints, but may be further constrained at the constraints endpoint.'
	)
