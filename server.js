ObjectId = require("mongodb").ObjectId;
const exercises = [
	{
		_id: ObjectId("635796d68c1bacf0200219a1"),
		ExerciseName: "Flat Barbell Bench Press",
		MuscleGroup: "Chest",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("6357a1888c1bacf0200219a5"),
		ExerciseName: "Incline Barbell Bench Press",
		MuscleGroup: "Chest",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("6357a1938c1bacf0200219a6"),
		ExerciseName: "Decline Barbell Bench Press",
		MuscleGroup: "Chest",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("6357a21d8c1bacf0200219a7"),
		ExerciseName: "Barbell Squat",
		MuscleGroup: "Quads",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("6357a2618c1bacf0200219a8"),
		ExerciseName: "Leg Extension",
		MuscleGroup: "Quads",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6357a2758c1bacf0200219a9"),
		ExerciseName: "Hamstring Curl",
		MuscleGroup: "Hamstrings",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6357a2a68c1bacf0200219aa"),
		ExerciseName: "EZ Bar Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6357a2dd8c1bacf0200219ab"),
		ExerciseName: "Preacher Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3a593ec73a7506de8440"),
		ExerciseName: "Close-Grip Barbell Bench Press",
		MuscleGroup: "Triceps",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636b3c09f561ba7f1710fd34"),
		ExerciseName: "Flat Dumbbell Bench Press",
		MuscleGroup: "Chest",
		Accessibility: "Home Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636b3c19f561ba7f1710fd35"),
		ExerciseName: "Incline Dumbbell Bench Press",
		MuscleGroup: "Chest",
		Accessibility: "Home Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636b3c2af561ba7f1710fd36"),
		ExerciseName: "Decline Dumbbell Bench Press",
		MuscleGroup: "Chest",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636b3c44f561ba7f1710fd37"),
		ExerciseName: "Flat Dumbbell Chest Fly",
		MuscleGroup: "Chest",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3c5ef561ba7f1710fd38"),
		ExerciseName: "Incline Dumbbell Chest Fly",
		MuscleGroup: "Chest",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3c69f561ba7f1710fd39"),
		ExerciseName: "Decline Dumbbell Chest Fly",
		MuscleGroup: "Chest",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3c84f561ba7f1710fd3a"),
		ExerciseName: "Machine Chest Press",
		MuscleGroup: "Chest",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3cc0f561ba7f1710fd3b"),
		ExerciseName: "Barbell Floor Chest Press",
		MuscleGroup: "Chest",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636b3ccbf561ba7f1710fd3c"),
		ExerciseName: "Dumbbell Floor Chest Press",
		MuscleGroup: "Chest",
		Accessibility: "Home Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636b3d6adbe4388e667522e5"),
		ExerciseName: "Cable Crossover",
		MuscleGroup: "Chest",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3d7cdbe4388e667522e6"),
		ExerciseName: "High-To-Low Cable Crossover",
		MuscleGroup: "Chest",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3d8cdbe4388e667522e7"),
		ExerciseName: "Low-To-High Cable Crossover",
		MuscleGroup: "Chest",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3daadbe4388e667522e8"),
		ExerciseName: "Push-Up",
		MuscleGroup: "Chest",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3db5dbe4388e667522e9"),
		ExerciseName: "Close-Grip Push-Up",
		MuscleGroup: "Chest",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3dc0dbe4388e667522ea"),
		ExerciseName: "Dip",
		MuscleGroup: "Chest",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3dcfdbe4388e667522eb"),
		ExerciseName: "Svend Press",
		MuscleGroup: "Chest",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3dd9dbe4388e667522ec"),
		ExerciseName: "Hex Press",
		MuscleGroup: "Chest",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3fbfdbe4388e667522ed"),
		ExerciseName: "Skullcrusher",
		MuscleGroup: "Triceps",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3fd2dbe4388e667522ee"),
		ExerciseName: "Overhand Cable Push-Down",
		MuscleGroup: "Triceps",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3fdfdbe4388e667522ef"),
		ExerciseName: "Underhand Cable Push-Down",
		MuscleGroup: "Triceps",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b3ff4dbe4388e667522f0"),
		ExerciseName: "Dumbbell Overhand Triceps Extension",
		MuscleGroup: "Triceps",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b4005dbe4388e667522f1"),
		ExerciseName: "Cable Overhand Triceps Extension",
		MuscleGroup: "Triceps",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b4024dbe4388e667522f2"),
		ExerciseName: "Single-Arm Cable Kick-Back",
		MuscleGroup: "Triceps",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636b402edbe4388e667522f3"),
		ExerciseName: "Single-Arm Dumbbell Kick-Back",
		MuscleGroup: "Triceps",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2761e7d454796f8710fd"),
		ExerciseName: "Side Lateral Raise",
		MuscleGroup: "Shoulders",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2778e7d454796f8710fe"),
		ExerciseName: "Front Raise",
		MuscleGroup: "Shoulders",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c27d4e7d454796f8710ff"),
		ExerciseName: "Barbell Overhead Press",
		MuscleGroup: "Shoulders",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636c27dfe7d454796f871100"),
		ExerciseName: "Dumbbell Overhead Press",
		MuscleGroup: "Shoulders",
		Accessibility: "Community Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636c27f4e7d454796f871101"),
		ExerciseName: "Landmine Press",
		MuscleGroup: "Shoulders",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636c281ae7d454796f871102"),
		ExerciseName: "Cable Face Pull",
		MuscleGroup: "Shoulders",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2834e7d454796f871103"),
		ExerciseName: "Rear Delt Fly",
		MuscleGroup: "Shoulders",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c283fe7d454796f871104"),
		ExerciseName: "Arnold Press",
		MuscleGroup: "Shoulders",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2859e7d454796f871105"),
		ExerciseName: "Barbell Push Press",
		MuscleGroup: "Shoulders",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636c2863e7d454796f871106"),
		ExerciseName: "Dumbbell Push Press",
		MuscleGroup: "Shoulders",
		Accessibility: "Home Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636c2880e7d454796f871107"),
		ExerciseName: "Barbell Shrug",
		MuscleGroup: "Traps",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2890e7d454796f871108"),
		ExerciseName: "Dumbbell Shrug",
		MuscleGroup: "Traps",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2bb6e7d454796f871109"),
		ExerciseName: "Reverse Pec Deck Fly",
		MuscleGroup: "Shoulders",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2c0be7d454796f87110a"),
		ExerciseName: "EZ Bar Preacher Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2c1de7d454796f87110b"),
		ExerciseName: "Barbell Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2c2ae7d454796f87110c"),
		ExerciseName: "Reverse Barbell Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2c37e7d454796f87110d"),
		ExerciseName: "Reverse EZ Bar Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2c48e7d454796f87110e"),
		ExerciseName: "Standing Dumbbell Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2c52e7d454796f87110f"),
		ExerciseName: "Incline Dumbbell Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2c5de7d454796f871110"),
		ExerciseName: "Hammer Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2c6be7d454796f871111"),
		ExerciseName: "Concentration Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2c7ce7d454796f871112"),
		ExerciseName: "Bar Cable Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2c8ee7d454796f871113"),
		ExerciseName: "Rope Cable Hammer Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2c99e7d454796f871114"),
		ExerciseName: "Zottman Curl",
		MuscleGroup: "Biceps",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2ca8e7d454796f871115"),
		ExerciseName: "Bicep Hold",
		MuscleGroup: "Biceps",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c2cb4e7d454796f871116"),
		ExerciseName: "Neutral Grip Bicep Hold",
		MuscleGroup: "Biceps",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c3097e7d454796f871117"),
		ExerciseName: "Pull-Up",
		MuscleGroup: "Lats",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c30a2e7d454796f871118"),
		ExerciseName: "Chin-Up",
		MuscleGroup: "Lats",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c30bce7d454796f871119"),
		ExerciseName: "Lat Pulldown",
		MuscleGroup: "Lats",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c30e2e7d454796f87111a"),
		ExerciseName: "Neutral Grip Lat Pulldown",
		MuscleGroup: "Lats",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c3106e7d454796f87111b"),
		ExerciseName: "Single-Arm Cable Lat Pulldown",
		MuscleGroup: "Lats",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c3126e7d454796f87111c"),
		ExerciseName: "Dumbbell Pull-Over",
		MuscleGroup: "Lats",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c3152e7d454796f87111d"),
		ExerciseName: "Close Grip Seated Row",
		MuscleGroup: "Lats",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c316ce7d454796f87111e"),
		ExerciseName: "Barbell Deadlift",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636c3178e7d454796f87111f"),
		ExerciseName: "Hex Bar Deadlift",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636c318ae7d454796f871120"),
		ExerciseName: "Barbell Bent-Over Row",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636c31a7e7d454796f871121"),
		ExerciseName: "Underhand Barbell Bent-Over Row",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636c31b5e7d454796f871122"),
		ExerciseName: "Yates Row",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636c31bde7d454796f871123"),
		ExerciseName: "Seal Row",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("636c31e2e7d454796f871124"),
		ExerciseName: "Dumbbell Bent-Over Row",
		MuscleGroup: "Back",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c31f5e7d454796f871125"),
		ExerciseName: "Dumbbell Single-Arm Row",
		MuscleGroup: "Back",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c3207e7d454796f871126"),
		ExerciseName: "Chest Supported Dumbbell Row",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c3213e7d454796f871127"),
		ExerciseName: "Inverted Row",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c322be7d454796f871128"),
		ExerciseName: "T-Bar Row",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c323de7d454796f871129"),
		ExerciseName: "Goodmorning",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c3247e7d454796f87112a"),
		ExerciseName: "Rack Pull",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("636c3254e7d454796f87112b"),
		ExerciseName: "Lower Back Extension",
		MuscleGroup: "Back",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("63719edf350d4ac6164ef3b1"),
		ExerciseName: "Low Feet Leg Press",
		MuscleGroup: "Quads",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("63719ef3350d4ac6164ef3b2"),
		ExerciseName: "Front Barbell Squat",
		MuscleGroup: "Quads",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("63719f02350d4ac6164ef3b3"),
		ExerciseName: "Hack Squat",
		MuscleGroup: "Quads",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("63719f0e350d4ac6164ef3b4"),
		ExerciseName: "V-Squat",
		MuscleGroup: "Quads",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("63719f24350d4ac6164ef3b5"),
		ExerciseName: "Pistol Squat",
		MuscleGroup: "Quads",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("63719f38350d4ac6164ef3b6"),
		ExerciseName: "Goblet Squat",
		MuscleGroup: "Quads",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("63719f59350d4ac6164ef3b7"),
		ExerciseName: "Sissy Squat",
		MuscleGroup: "Quads",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("63719f75350d4ac6164ef3b8"),
		ExerciseName: "Bulgarian Split Squat",
		MuscleGroup: "Quads",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("63719f81350d4ac6164ef3b9"),
		ExerciseName: "Wall Sit",
		MuscleGroup: "Quads",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("63719f90350d4ac6164ef3ba"),
		ExerciseName: "Dumbbell Step-Up",
		MuscleGroup: "Quads",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("63719f9f350d4ac6164ef3bb"),
		ExerciseName: "Dumbbell Forward Lunge",
		MuscleGroup: "Quads",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("63719fa8350d4ac6164ef3bc"),
		ExerciseName: "Dumbbell Walking Lunge",
		MuscleGroup: "Quads",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("63719fd7350d4ac6164ef3bd"),
		ExerciseName: "Lateral Lunge",
		MuscleGroup: "Quads",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("63719ff7350d4ac6164ef3be"),
		ExerciseName: "Box Jump",
		MuscleGroup: "Quads",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6371a007350d4ac6164ef3bf"),
		ExerciseName: "Barbell Forward Lunge",
		MuscleGroup: "Quads",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6371a00e350d4ac6164ef3c0"),
		ExerciseName: "Barbell Walking Lunge",
		MuscleGroup: "Quads",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6371a04b350d4ac6164ef3c1"),
		ExerciseName: "Landmine Squat",
		MuscleGroup: "Quads",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373f8f471b45d5867405d1d"),
		ExerciseName: "Barbell Romanian Deadlift",
		MuscleGroup: "Hamstrings",
		Accessibility: "Commercial Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("6373f90e71b45d5867405d1e"),
		ExerciseName: "Dumbbell Romanian Deadlift",
		MuscleGroup: "Hamstrings",
		Accessibility: "Home Gym",
		WarmUpReq: "Y",
	},
	{
		_id: ObjectId("6373f93171b45d5867405d1f"),
		ExerciseName: "Sumo Squat",
		MuscleGroup: "Hamstrings",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373f94771b45d5867405d20"),
		ExerciseName: "Kettlebell Swing",
		MuscleGroup: "Hamstrings",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373f97371b45d5867405d21"),
		ExerciseName: "Single-Leg Deadlift",
		MuscleGroup: "Hamstrings",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373f98b71b45d5867405d22"),
		ExerciseName: "Nordic Curl",
		MuscleGroup: "Hamstrings",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373f9aa71b45d5867405d23"),
		ExerciseName: "High Feet Leg Press",
		MuscleGroup: "Hamstrings",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373fa3671b45d5867405d24"),
		ExerciseName: "Barbell Hip Thrust",
		MuscleGroup: "Glutes",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373fa4471b45d5867405d25"),
		ExerciseName: "Barbell Glute Bridge",
		MuscleGroup: "Glutes",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373fa7f71b45d5867405d26"),
		ExerciseName: "Glute Ham Raise",
		MuscleGroup: "Glutes",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373fa9171b45d5867405d27"),
		ExerciseName: "Cable Pull-Through",
		MuscleGroup: "Glutes",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373fa9e71b45d5867405d28"),
		ExerciseName: "Hip Abduction Machine",
		MuscleGroup: "Glutes",
		Accessibility: "Community Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373fab671b45d5867405d29"),
		ExerciseName: "Rounded Back Extension",
		MuscleGroup: "Glutes",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373fac971b45d5867405d2a"),
		ExerciseName: "Glute Kickback",
		MuscleGroup: "Glutes",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373faeb71b45d5867405d2b"),
		ExerciseName: "Seated Calf Raise",
		MuscleGroup: "Calves",
		Accessibility: "Commercial Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373faf871b45d5867405d2c"),
		ExerciseName: "Standing Calf Raise",
		MuscleGroup: "Calves",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
	{
		_id: ObjectId("6373fb0271b45d5867405d2d"),
		ExerciseName: "Donkey Calf Raise",
		MuscleGroup: "Calves",
		Accessibility: "Home Gym",
		WarmUpReq: "N",
	},
];

//Server stuff
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
app.set("port", process.env.PORT || 5000);

//Email verification
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

//md5 hashing algorithm
var blueimp = require("blueimp-md5");

//MongoDB stuff
//MONGODB_URI=mongodb+srv://kyle:Kal3chip@cluster0.3t6fftz.mongodb.net/?
require("dotenv").config();
const url = process.env.MONGODB_URI;
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect();

//Set up production env
if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
}

//API and extra
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
	next();
});

//Autofills routine randomly based on questionarre answers
app.post("/api/autoFillRoutines", async (req, res, next) => {
	const { equipment, time, muscleGroup, _id } = req.body;
	var routine1 = [];
	var routine2 = [];

	const db = client.db("gymdb");

	var randomInput1 = -1;
	var randomInput2 = -1;

	if (muscleGroup == "") {
		randomInput1 = parseInt(Math.random() * 100) % 2;
	}
	if (time == "") {
		randomInput2 = parseInt(Math.random() * 100) % 2;
	}

	if (muscleGroup == "Upper Body" || randomInput1 == 0) {
		const results1 = await db
			.collection("exercises")
			.find({
				MuscleGroup: "Chest",
				Accessibility: { $regex: equipment + ".*", $options: "r" },
			})
			.toArray();
		const results2 = await db
			.collection("exercises")
			.find({
				MuscleGroup: "Triceps",
				Accessibility: { $regex: equipment + ".*", $options: "r" },
			})
			.toArray();
		const results3 = await db
			.collection("exercises")
			.find({
				MuscleGroup: "Shoulders",
				Accessibility: { $regex: equipment + ".*", $options: "r" },
			})
			.toArray();
		const results4 = await db
			.collection("exercises")
			.find({
				MuscleGroup: "Back",
				Accessibility: { $regex: equipment + ".*", $options: "r" },
			})
			.toArray();
		const results5 = await db
			.collection("exercises")
			.find({
				MuscleGroup: "Biceps",
				Accessibility: { $regex: equipment + ".*", $options: "r" },
			})
			.toArray();
		const results6 = await db
			.collection("exercises")
			.find({
				MuscleGroup: "Traps",
				Accessibility: { $regex: equipment + ".*", $options: "r" },
			})
			.toArray();
		const results7 = await db
			.collection("exercises")
			.find({
				MuscleGroup: "Lats",
				Accessibility: { $regex: equipment + ".*", $options: "r" },
			})
			.toArray();

		const all = results1.concat(results2, results3, results4, results5, results6, results7);

		for (var i = 0; i < 3; ++i) {
			var random = parseInt(Math.random() * all.length);
			routine1.push(all[random]);
			all.splice(random, 1);
			random = parseInt(Math.random() * all.length);
			routine2.push(all[random]);
			all.splice(random, 1);
		}

		if (time == "Y" || randomInput2 == 0) {
			for (var i = 0; i < 3; ++i) {
				var random = parseInt(Math.random() * all.length);
				routine1.push(all[random]);
				all.splice(random, 1);
				random = parseInt(Math.random() * all.length);
				routine2.push(all[random]);
				all.splice(random, 1);
			}
		}
	} else if (muscleGroup == "Lower Body" || randomInput1 == 1) {
		var results1;
		var results2;
		var results3;
		var results4;
		if (equipment == "Community Gym") {
			results1 = await db.collection("exercises").find({ MuscleGroup: "Quads" }).toArray();
			results2 = await db.collection("exercises").find({ MuscleGroup: "Hamstrings" }).toArray();
			results3 = await db.collection("exercises").find({ MuscleGroup: "Glutes" }).toArray();
			results4 = await db.collection("exercises").find({ MuscleGroup: "Calves" }).toArray();
		} else {
			results1 = await db
				.collection("exercises")
				.find({
					MuscleGroup: "Quads",
					Accessibility: { $regex: equipment + ".*", $options: "r" },
				})
				.toArray();
			results2 = await db
				.collection("exercises")
				.find({
					MuscleGroup: "Hamstrings",
					Accessibility: { $regex: equipment + ".*", $options: "r" },
				})
				.toArray();
			results3 = await db
				.collection("exercises")
				.find({
					MuscleGroup: "Glutes",
					Accessibility: { $regex: equipment + ".*", $options: "r" },
				})
				.toArray();
			results4 = await db
				.collection("exercises")
				.find({
					MuscleGroup: "Calves",
					Accessibility: { $regex: equipment + ".*", $options: "r" },
				})
				.toArray();
		}

		const all = results1.concat(results2, results3, results4);

		for (var i = 0; i < 3; ++i) {
			var random = parseInt(Math.random() * all.length);
			routine1.push(all[random]);
			all.splice(random, 1);
			random = parseInt(Math.random() * all.length);
			routine2.push(all[random]);
			all.splice(random, 1);
		}

		if (time == "Y" || randomInput2 == 0) {
			for (var i = 0; i < 3; ++i) {
				var random = parseInt(Math.random() * all.length);
				routine1.push(all[random]);
				all.splice(random, 1);
				random = parseInt(Math.random() * all.length);
				routine2.push(all[random]);
				all.splice(random, 1);
			}
		}
	}

	const results = await db
		.collection("users")
		.updateOne({ _id: ObjectId(_id) }, { $set: { Routine1: routine1, Routine2: routine2 } });
	//const results = await db.collection('users').find({ _id: ObjectId(_id) }).toArray();

	var ret = { results: results };
	res.status(200).json(ret);
});

//Populates routine table on routine page load
app.post("/api/populateTable", async (req, res, next) => {
	const { _id } = req.body;
	var routines = [[]];
	var is_found = 0;

	const db = client.db("gymdb");
	const results = await db
		.collection("users")
		.find({ _id: ObjectId(_id) })
		.toArray();
	if (results[0].Routine1 != undefined) {
		routines = [results[0].Routine1, results[0].Routine2];
		is_found = 1;
	}

	var result;
	if (is_found == 1) {
		result = routines;
	} else {
		result = "";
	}
	ret = { results: result };
	res.status(200).json(ret);
});

//Changes password
app.post("/api/changePassword", async (req, res, next) => {
	const { _id, oldPassword, newPassword } = req.body;

	const db = client.db("gymdb");
	var results = await db
		.collection("users")
		.updateOne(
			{ _id: ObjectId(_id), Password: blueimp(oldPassword) },
			{ $set: { Password: blueimp(newPassword) } }
		);

	ret = { results: results };
	res.status(200).json(ret);
});

//Resets password
app.post("/api/resetPassword", async (req, res, next) => {
	const { email } = req.body;
	const newPassword = (parseInt(Math.random() * 100000000) % 100000000) + 1;

	const db = client.db("gymdb");
	var results = await db
		.collection("users")
		.updateMany({ Email: email, EmailVerified: "1" }, { $set: { Password: blueimp(newPassword) } });
	if (results.modifiedCount != 0) {
		passwordEmailReset(newPassword, email);
	}

	ret = { results: results };
	res.status(200).json(ret);
});

//Replaces a routine in an exercise
app.post("/api/replaceExercise", async (req, res, next) => {
	const { _id, routineNum, routineIndex, newExerciseId } = req.body;

	const db = client.db("gymdb");

	const newExercise = await db
		.collection("exercises")
		.find({ _id: ObjectId(newExerciseId) })
		.toArray();

	var results;
	var newArray;

	const user = await db
		.collection("users")
		.find({ _id: ObjectId(_id) })
		.toArray();

	if (routineNum == 1) {
		newArray = user[0].Routine1;
	} else if (routineNum == 2) {
		newArray = user[0].Routine2;
	}

	newArray[routineIndex] = newExercise[0];

	if (routineNum == 1) {
		results = await db
			.collection("users")
			.updateOne({ _id: ObjectId(_id) }, { $set: { Routine1: newArray } });
	} else if (routineNum == 2) {
		results = await db
			.collection("users")
			.updateOne({ _id: ObjectId(_id) }, { $set: { Routine2: newArray } });
	}

	var ret = { results: results };
	res.status(200).json(ret);
});

//Searches for a 10-page of exercises
app.post("/api/searchExercises", async (req, res, next) => {
	const { searchText, equipment, muscleGroup, warmUpReq, pageNum } = req.body;
	var results;
	var final = [];

	const db = client.db("gymdb");
	results = await db
		.collection("exercises")
		.find({
			ExerciseName: { $regex: searchText + ".*", $options: "i" },
			Accessibility: { $regex: equipment + ".*", $options: "r" },
			MuscleGroup: { $regex: muscleGroup + ".*", $options: "r" },
			WarmUpReq: { $regex: warmUpReq + ".*", $options: "r" },
		})
		.collation({ locale: "en_US", strength: 1, caseLevel: false })
		.toArray();
	//Omit id: , { projection: { _id: 0 } }

	for (var i = 0; i < 10; ++i) {
		if (results[i + pageNum * 10] != undefined) {
			final.push(results[i + pageNum * 10]);
		}
	}

	var ret = { results: final };
	res.status(200).json(ret);
});

//Adds the exercises
app.post("/api/add", async (req, res, next) => {
	const db = client.db("gymdb");
	const results = await db.collection("exercises").insertMany(exercises);

	var ret = { results: results };
	res.status(200).json(ret);
});

//Registers user
app.post("/api/register", async (req, res, next) => {
	const { firstName, lastName, login, password, email } = req.body;
	const newUser = {
		FirstName: firstName,
		LastName: lastName,
		Username: login,
		Password: blueimp(password),
		Email: email,
		EmailVerified: "0",
	};
	var error = "";

	try {
		const db = client.db("gymdb");
		var result = await db.collection("users").insertOne(newUser);
		tokenSender(email, result.insertedId);
	} catch (e) {
		error = e.toString();
	}

	var ret = { error: error };
	res.status(200).json(ret);
});

//Displays full list of users
app.post("/api/list", async (req, res, next) => {
	const db = client.db("gymdb");
	const results = await db.collection("users").find({}).toArray();
	res.status(200).json([results]);
});

//Logs user in
app.post("/api/login", async (req, res, next) => {
	const { login, password } = req.body;
	const db = client.db("gymdb");
	const results = await db
		.collection("users")
		.find({ Username: login, Password: blueimp(password) })
		.toArray();
	var error = "";
	var id = -1;
	var fn = "";
	var ln = "";
	if (results.length > 0) {
		id = results[0]._id;
		fn = results[0].FirstName;
		ln = results[0].LastName;
	}
	var ret = { id: id, firstName: fn, lastName: ln, error: "" };
	res.status(200).json(ret);
});

//Email verification API
app.get("/api/verification/:token", async (req, res) => {
	const { token } = req.params;
	const db = client.db("gymdb");

	//res.send("Email verification page.");

	try {
		jwt.verify(token, "ourSecretKey", async function (err, decoded) {
			if (err) {
				console.log(err);
				res.send("Email verification failed. The link may be invalid or expired.");
			} else {
				res.send(
					"Email verified successfully! Now you can reset your password if you ever forget it."
				);
				var json = jwt.decode(token);
				Userid = json.data;
				const results = await db
					.collection("users")
					.updateOne({ _id: ObjectId(Userid) }, { $set: { EmailVerified: "1" } });
				console.log(results);
			}
		});
	} catch (err) {
		//res.send("Email verification page.");
	}
});

//Deletes User
app.post("/api/deleteuser", async (req, res, next) => {
	const { login, password } = req.body;
	const db = client.db("gymdb");
	const results = await db
		.collection("users")
		.findOneAndDelete({ Username: login, Password: blueimp(password) });
	var error = "";
	var id = -1;
	var fn = "";
	var ln = "";
	if (results.length > 0) {
		id = results[0]._id;
		fn = results[0].FirstName;
		ln = results[0].LastName;
	}
	var ret = { id: id, firstName: fn, lastName: ln, error: "" };
	res.status(200).json(ret);
});

//Email verification token generator
async function tokenSender(userEmail, userId) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "gymbroseph@gmail.com",
			pass: "jrvrrhfskhexkbqo",
		},
	});

	const token = jwt.sign(
		{
			data: userId,
		},
		"ourSecretKey",
		{ expiresIn: "10m" }
	);

	const mailConfigurations = {
		from: "gymbroseph@gmail.com",
		to: userEmail,
		subject: "Email Verification",
		text: `Hello There! You have recently registered a GymBroseph account with your email. Please use this link to verify your account:

           https://gymbroseph.herokuapp.com/api/verification/${token}

           http://localhost:5000/api/verification/${token}

		   Thanks.`,
	};

	transporter.sendMail(mailConfigurations, function (error, info) {
		//if (error) throw Error(error);
		console.log("Email Sent Successfully");
		console.log(info);
	});
}

//Password reset email generator
async function passwordEmailReset(newUserPassword, userEmail) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "gymbroseph@gmail.com",
			pass: "jrvrrhfskhexkbqo",
		},
	});

	const mailConfigurations = {
		from: "gymbroseph@gmail.com",
		to: userEmail,
		subject: "Password Reset",
		text: `Hello There! You have requested a password reset. Use this password to log back in and reset it with your password of choice using the "Change Password" button.

            New Password: ${newUserPassword}

		   Thanks.`,
	};

	transporter.sendMail(mailConfigurations, function (error, info) {
		console.log("Email Sent Successfully");
		console.log(info);
	});
}

//Listens to the decided port
app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});

module.exports = app;
