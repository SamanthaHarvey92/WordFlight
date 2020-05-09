DROP TABLE IF EXISTS [dbo].[wordflightsponsors]

CREATE TABLE [dbo].[WordFlightSponsors]
(
	[sponsor_id] INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
	[sponsor_name] VARCHAR(28) NOT NULL
)
