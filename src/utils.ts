import * as anchor from '@project-serum/anchor';

export async function generateTrackerAddresses(
    base: anchor.web3.PublicKey,
    programId: anchor.web3.PublicKey,
    from: number, to: number
  ): Promise<anchor.web3.PublicKey[]> {
    let addresses = []
    for (var x = from; x < to; x++) {
      let [marketTrackerAddress, marketTrackerBump] = await anchor.web3.PublicKey.findProgramAddress(
        [base.toBuffer(), Buffer.from(x.toString())],
        programId
      );
      let index = x - from;
      addresses[index] = marketTrackerAddress;
    }
    return addresses;
}

