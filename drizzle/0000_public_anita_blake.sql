CREATE TABLE IF NOT EXISTS "job-tracker-t3_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "job-tracker-t3_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job-tracker-t3_jobApplication" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"dateApplied" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"dateAppliedReadable" varchar(255),
	"daysSinceInitialSubmission" integer,
	"jobURL" varchar(255),
	"jobSource" varchar(255),
	"postedSalary" varchar(255),
	"postedSalaryType" varchar(255),
	"levelOfInterest" varchar(255),
	"resume" boolean,
	"resumeUploadURL" varchar(255),
	"coverLetter" boolean,
	"coverLetterUploadURL" varchar(255),
	"project" boolean,
	"projectURL" varchar(255),
	"projectLink" varchar(255),
	"stageOfApplication" integer DEFAULT 0,
	"notes" varchar[],
	"company" varchar(255),
	"showingDetails" boolean DEFAULT false,
	"isArchived" boolean DEFAULT false,
	"autoArchived" boolean DEFAULT false,
	"lastActivityDate" timestamp DEFAULT CURRENT_TIMESTAMP,
	"owner" varchar(255) NOT NULL,
	"jobType" varchar(255),
	"isRemote" boolean,
	"isUSBased" boolean,
	"country" varchar(255),
	"city" varchar(255),
	"state" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job-tracker-t3_session" (
	"sessionToken" text NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job-tracker-t3_user" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp,
	"image" varchar(255),
	"sub" varchar(255),
	"displayName" varchar(255),
	"date" timestamp DEFAULT CURRENT_TIMESTAMP,
	"autoArchive" boolean DEFAULT true,
	CONSTRAINT "job-tracker-t3_user_name_unique" UNIQUE("name"),
	CONSTRAINT "job-tracker-t3_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job-tracker-t3_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "job-tracker-t3_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job-tracker-t3_account" ADD CONSTRAINT "job-tracker-t3_account_userId_job-tracker-t3_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."job-tracker-t3_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job-tracker-t3_jobApplication" ADD CONSTRAINT "job-tracker-t3_jobApplication_owner_job-tracker-t3_user_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."job-tracker-t3_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job-tracker-t3_session" ADD CONSTRAINT "job-tracker-t3_session_userId_job-tracker-t3_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."job-tracker-t3_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
