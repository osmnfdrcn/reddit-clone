import { ICommunity } from "@/src/atoms/communitiesAton";
import Header from "@/src/components/Community/Header";
import CommunityNotFound from "@/src/components/Community/NotFound";
import PageContent from "@/src/components/Layout/PageContent";
import { firestore } from "@/src/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import safeJsonStingify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: ICommunity;
};

const CommunityPage = ({ communityData }: CommunityPageProps) => {
  if (!communityData) {
    return <CommunityNotFound />;
  }
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <div>LHS</div>
          <div>LHS</div>
          <div>LHS</div>
          <div>LHS</div>
          <div>LHS</div>
          <div>LHS</div>
          <div>LHS</div>
        </>
        <>
          <div>RHS</div>
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { communityId } = context.query;
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    // problem with serializing timestamp values
    const communityData = communityDoc.exists()
      ? JSON.parse(
          safeJsonStingify({ id: communityDoc.id, ...communityDoc.data() })
        )
      : null;

    return {
      props: {
        communityData,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
