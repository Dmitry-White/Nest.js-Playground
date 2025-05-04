class CreateAlarmCommand {
  constructor(
    private readonly name: string,
    public readonly severity: string,
  ) {}
}

export { CreateAlarmCommand };
