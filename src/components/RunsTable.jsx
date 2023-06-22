const RunsTable = ({ runs }) => {
  let over = 0;
  let ball = 0;

  return (
    <div className='w-full p-4 rounded-2xl shadow-lg'>
      <table className='w-full mt-4'>
        <thead>
          <tr>
            <th className='px-4 py-2 text-left border'>Over</th>
            <th className='px-4 py-2 text-left border'>Run</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run, index) => {
            if (ball === 6) {
              over++;
              ball = 1;
            } else {
              ball++;
            }

            const overDisplay =
              over === 0 && ball === 0 ? '0.6' : `${over}.${ball}`;

            return (
              <tr key={index}>
                <td className='border  px-4 py-2'>{overDisplay}</td>
                <td className='border  px-4 py-2'>{run}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RunsTable;
