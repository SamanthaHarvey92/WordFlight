DROP TABLE IF EXISTS [dbo].[wordflightleaderboard]

CREATE TABLE [dbo].[WordFlightLeaderboard]
(
	[entry_id] INT NOT NULL PRIMARY KEY IDENTITY (1, 1), 
    [user] CHAR(2) NOT NULL, 
    [score] INT NOT NULL
)
