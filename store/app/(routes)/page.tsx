import getBillboard from "@/actions/get-billboards"
import Billboard from "@/components/billboard"
import Container from "@/components/ui/container"

export const revalidate = 0

const HomePage =  async() => {
    const billboard = await getBillboard("3ba6156a-a17f-44b3-97c3-1f68cfc0907b")
  
    return(
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard}/>
            </div>
       
        </Container>
    )
}

export default HomePage